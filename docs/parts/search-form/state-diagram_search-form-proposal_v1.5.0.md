# State Diagram: Search Form Proposal v1.5.0    

```mermaid
stateDiagram
    [*] --> Initial
    Initial --> UrlSet: Search Term Change
    UrlSet --> UrlSet: New Search Term
    UrlSet --> Fetching: Submit Click
    Fetching --> Success: API Success
    Fetching --> Error: API Error
    Success --> UrlSet: New Search Term
    Error --> UrlSet: New Search Term

    state "Initial" as I
    I : searchUrl = ""
    I : shouldFetch = false

    state "UrlSet" as U
    U : searchUrl = valid
    U : shouldFetch = false

    state "Fetching" as F
    F : searchUrl = valid
    F : shouldFetch = true
    F : isLoading = true

    state "Success" as S
    S : searchUrl = valid
    S : shouldFetch = false
    S : isLoading = false

    state "Error" as E
    E : searchUrl = valid
    E : shouldFetch = false
    E : isLoading = false
    E : error = true
```
