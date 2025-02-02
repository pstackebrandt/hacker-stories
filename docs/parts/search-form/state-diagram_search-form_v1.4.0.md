# State Diagram: Search Form v1.4.0
  
```mermaid
stateDiagram
    [*] --> IS
    IS --> U: Search Term Change
    U --> U: New Search Term
    U --> F: Submit Button Click
    F --> D: Fetch Success
    F --> E: Fetch Failure
    D --> U: New Search Term
    E --> U: New Search Term

    state "InitialState" as IS
    IS: url = null
    IS: shouldFetch = false

    state "URLUpdated" as U
    U : url = "string"
    U : shouldFetch = false

    state "FetchingData" as F
    F : url = "string"
    F : shouldFetch = true
    F : isLoading = true

    state "DataReceived" as D
    state "FetchError" as E
```
