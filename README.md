# Quiet Clojure Syntax

Quiet Clojure Syntax is a small, data-only companion extension for [Calva](https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva). It adds precise TextMate scopes that restrained color themes can target without replacing Calva or modifying its installed files.

It provides scopes for:

- top-level names introduced by `def`, `defn`, `defonce`, and other `def*` forms;
- Clojure character literals, including escaped delimiters such as `\\)`;
- metadata markers and keyword metadata such as `^:private`.

There is no executable code and the extension requests no permissions. Colors remain under the user's control through `editor.tokenColorCustomizations`.

## Scopes

| Syntax | Scope |
| --- | --- |
| Top-level definition name | `entity.global.clojure` |
| Character literal | `constant.character.clojure` |
| Metadata marker | `punctuation.definition.metadata.clojure` |
| Metadata keyword | `constant.keyword.clojure` |

## Requirements

[Calva](https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva) supplies the base Clojure grammar.

## Releases

Every commit to `main` is published automatically. Marketplace versions use
`1.0.<main commit count>`.

## License

MIT
