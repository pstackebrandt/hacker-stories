# Using diagram files

## State of the diagrams

The diagrams were used before change to TypeScript and adhering refactorings!
They will be misleading currently!

## How to use and update the diagrams

### md files

This files contain common markdown like headings, lists, etc. and can contain mermaid diagrams additionally.
It's possible to view them in the ide via context menu -> Open preview.
That's processed in vs code/cursor ide by a mermaid plugin for vs code (Markdown Preview Mermaid Support by bierner).

### mmd files

It looks like they can contain mermaid diagrams only. I process them with the mermaid cli.
See mermaid scripts in package.json.
Run the scripts to generate the png files eg. by `npm run mermaid-search-form`.

### Updating the diagrams

The diagrams were created initially by claude 3.5 sonnet in cursor ide.
The sequence diagrams worked well.

The state diagrams were created by claude 3.5 sonnet with errors. Claude, Chat gpt 4o and o1 were not able to fix them.

#### Wrong

IS: url: null
IS: shouldFetch: false

#### Correct

IS: url = null
IS: shouldFetch = false
