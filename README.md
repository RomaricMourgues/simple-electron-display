# Very simple frames

This little electron tool displays frames relative to a simple configuration.

### How to run

Download the binary you need in the download folder.

### How to use

On first run you can define your configuration in JSON like following:

```json
[
  { "url": "https://example.com", "x": 0, "y": 0, "width": 100, "height": 100 },
  {
    "url": "https://google.com",
    "x": 100,
    "y": 100,
    "width": 100,
    "height": 100
  }
]
```

**After first run**, you will be able to open this configuration tool again with `CmdOrCtrl+I`

### How to develop / build

`yarn start` to run locally

`` to build for all platforms
