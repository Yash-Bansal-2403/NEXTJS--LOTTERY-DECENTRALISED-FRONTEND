import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        < nav  >

            <div>

                <ConnectButton moralisAuth={false} />
                {/* moralisAuth={false} -->this tells we are not using moralis server */}
            </div>
        </nav >
    )
}