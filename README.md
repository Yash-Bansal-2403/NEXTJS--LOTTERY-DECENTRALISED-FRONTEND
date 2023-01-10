# NextJS Lottery Decentralized Frontend

# Getting Started

## Requirements

-   [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    -   You can run `git --version` and you see a response like `git version x.x.x`
-   [Nodejs](https://nodejs.org/en/)
    -   You can run:
        -   `node --version` and get an ouput like: `vx.x.x`

## Quickstart

```
git clone https://github.com/Yash-Bansal-2403/NEXTJS--LOTTERY-DECENTRALISED-FRONTEND.git
npm install
npm run dev
```

## Formatting in VSCode

To have VSCode extension prettier auto-format `.jsx`, add the following to your settings.json file:

```
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
```

# Usage

1. Run your local blockchain with the lottery code

> In a different terminal / command line

```
git clone https://github.com/Yash-Bansal-2403/HARDHAT-LOTTERY-DECENTRALIZED-BACKEND.git
npm install
npx hardhat node
```

> You can read more about how to use that repo from its [README.md](https://github.com/Yash-Bansal-2403/HARDHAT-LOTTERY-DECENTRALIZED-BACKEND/blob/main/README.md)

2. Add hardhat network to your metamask/wallet

-   Get the RPC_URL of your hh node (usually `http://127.0.0.1:8545/`)
-   Go to your wallet and add a new network. [See instructions here.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)
    -   Network Name: Hardhat-Localhost
    -   New RPC URL: http://127.0.0.1:8545/
    -   Chain ID: 31337
    -   Currency Symbol: ETH (or GO)
    -   Block Explorer URL: None

Ideally, you'd then [import one of the accounts](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) from hardhat to your wallet/metamask.

3. Run this code

Back in a different terminal with the code from this repo, run:

```
npm run dev
```

4. Go to UI and have fun!

Head over to your [localhost](http://localhost:3000) and play with the lottery!

# Deploying to IPFS

1. Build your static code.

```
npm run build
```

2. Export your site

```
npm run export
```

3. Deploy to IPFS

-   [Download IPFS desktop](https://ipfs.io/#install)
-   Open your [IPFS desktop app](https://ipfs.io/)
-   Select `import` and choose the folder the above step just created (should be `out`)

4. Copy the CID of the folder you pinned

![IPFS](./img/readme-ipfs.png)

5. Get [IPFS companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch?hl=en) for your browser (or use [Brave Browser](https://brave.com/))

6. Go to `ipfs://YOUR_CID_HERE` and see your ipfs deployed site!

# Deploy to IPFS using Fleek

You can also have [Fleek](https://fleek.co/) auto-deploy your website if you connect your github. Connect to fleek and follow along the docs there. You'll get an IPFS hash and a "regular" URL for your site.

# Thank you!
