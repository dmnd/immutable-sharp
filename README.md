# Immutable Sharp

A sharper Immutable that raises instead of returning undefined.

Provides `fetch`/`fetchIn` as alternatives to Immutable's `get`/`getIn`. These
new methods raise exceptions when their key (or key path) isn't valid.

## License

MIT
