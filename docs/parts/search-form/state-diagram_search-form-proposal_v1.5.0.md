# sequenceDiagram Search Form v1.4.0

```mermaid
stateDiagram-v2
    [*] --> Initial
    Initial --> UrlSet: Search Term Change
    UrlSet --> UrlSet: New Search Term
    UrlSet --> Fetching: Submit Click
    Fetching --> Success: API Success
    Fetching --> Error: API Error
    Success --> UrlSet: New Search Term
    Error --> UrlSet: New Search Term

    state Initial {
        searchUrl: ""
        shouldFetch: false
    }
    
    state UrlSet {
        searchUrl: valid
        shouldFetch: false
    }
    
    state Fetching {
        searchUrl: valid
        shouldFetch: true
        isLoading: true
    }

    state Success {
        searchUrl: valid
        shouldFetch: false
        isLoading: false
    }

    state Error {
        searchUrl: valid
        shouldFetch: false
        isLoading: false
        error: true
    }
```
