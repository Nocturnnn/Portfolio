"""Small HTML tree for the buildless portfolio's static page generation."""
from html import escape
from html.parser import HTMLParser

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class Node:
    def __init__(self, tag=None, attrs=None, text=None, raw=False):
        self.tag, self.attrs, self.text, self.raw = tag, dict(attrs or []), text, raw
        self.children = []

    def walk(self):
        yield self
        for child in self.children:
            yield from child.walk()

    def html(self):
        if self.text is not None:
            return self.text if self.raw else escape(self.text, quote=False)
        content = "".join(child.html() for child in self.children)
        if self.tag is None:
            return content
        attrs = "".join(" " + key + ("" if value is None else '="' + escape(str(value), quote=True) + '"') for key, value in self.attrs.items())
        return f"<{self.tag}{attrs}>" + ("" if self.tag in VOID else content + f"</{self.tag}>")


class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if self.stack[-1].tag != tag:
            raise ValueError(f"Invalid HTML nesting: expected {self.stack[-1].tag}, got {tag}")
        self.stack.pop()

    def handle_data(self, data):
        self.stack[-1].children.append(Node(text=data, raw=self.stack[-1].tag in ("script", "style")))

    def handle_comment(self, data):
        self.stack[-1].children.append(Node(text="<!--" + data + "-->", raw=True))

    def handle_decl(self, data):
        self.stack[-1].children.append(Node(text="<!" + data + ">", raw=True))


def parse(html):
    parser = Parser()
    parser.feed(html)
    if len(parser.stack) != 1:
        raise ValueError("Unclosed HTML elements")
    return parser.root


def fragment(html):
    return parse(html).children
