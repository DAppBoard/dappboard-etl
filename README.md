# DAppBoard Ethereum ETL
ETL pipeline for the Ethereum blockchain using NodeJS, EthereumJS and any Ethereum node providing RPC interface.

### How does it works?

For a given block, the block information, transactions and transaction receipts are fetched and processed by several processors which goal is to extract and structure informations such as events, ERC20 transfers, NFTs transfers and load them in a database.

### How to run it?

You will first need to [install the DAppBoard  environment](https://github.com/DAppBoard/dappboard-environment).

```git clone https://github.com/DAppBoard/ethereum-etl.git &&
cd ethereum-etl```

TODO: How to populate the DB with schemas?

TODO: Run the ecosystem files


### Schemas

This ETL reads the blockchain block by blck in order to identify and save the following elements:

- [Blocks](https://github.com/DAppBoard/ethereum-etl/blob/master/schemas/tables/blocks.sql): A block is the basic element of a 'blockchain'. It functions as an entry in a distributed ledger, recording a series of transactions together with a reference to the previous block. A block is chained to its preceeding block by a cryptographic hash of its contents as a means of reference.
- [Transactions](https://github.com/DAppBoard/ethereum-etl/blob/master/schemas/tables/transactions.sql): Transactions are messages between two accounts that may transfer Ether and may contain a payload. Transactions always originate from an external account that is controlled by an external actor by means of a private key.
- [Events](https://github.com/DAppBoard/ethereum-etl/blob/master/schemas/tables/events.sql): Events are structures implemented in smart contracts. They cannot be accessed from the contract but can be used from the outside, e.g. by a web application that reacts to Events in a smart contract.
- [Token transfers](https://github.com/DAppBoard/ethereum-etl/blob/master/schemas/tables/token_transfers.sql): Event generated when a token is transferred between 2 addresses.
- [Tokens](https://github.com/DAppBoard/ethereum-etl/blob/master/schemas/tables/meta_tokens.sql): A token is a virtual good that can be traded. They can be ERC20 or ERC721 (NFTs)\.
- [Meta events](https://github.com/DAppBoard/ethereum-etl/blob/master/schemas/tables/meta_events.sql): The name and parameters of events implemented by a smart contract.

### Contributors

This ETL is developped by the [DAppBoard](http://dappboard.com) team and is used there. We're glad to offer our technology to the public so anyone can understand how data are gathered and stored before being displayed.

We'd like to thanks [Blockchain ETL](https://github.com/blockchain-etl/ethereum-etl) that inspired us and helped us organize data in a easy to understand format and where tools can be used and developed across teams and projects.

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
