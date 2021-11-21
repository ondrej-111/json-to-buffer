# json-to-buffer

**json-to-buffer** travers JSON object and using `Buffer.from(JSON.stringify(chunk))` converts object to Buffer - could
be handy for converting large JSON objects to Buffer.

### Usage

```typescript
import jsonToBuffer from 'json-to-buffer'
// import { jsonToBuffer } from 'json-to-buffer'

jsonToBuffer({data: [{to: "convert"}]});
```
