import { contractAddresses, abi } from "../constants"//constants folder hold abi,address of contract and is managed by backend
import { useMoralis, useWeb3Contract } from "react-moralis"
//useMoralis hook will be used to access-  Moralis, isWeb3Enabled, chainId
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import { Box, Button, Grid, Paper, Typography } from "@mui/material"


export default function LotteryEntrance() {

    //Header component provides all the info about metamask to Morallis Provider 
    // and Morallis provides all the info down to other components
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // State hooks
    const [minContribution, setMinContribution] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const [lotteryBalance, setLotteryBalance] = useState("0");

    const dispatch = useNotification()//dispatch function helps us to create a custom Notification

    const {
        runContractFunction: enterLottery,//used to call the contract function
        data: enterTxResponse,//data returned from function call
        isLoading,//helps to do something with UI when Loading
        isFetching,//helps to do something with UI when Loading 
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        msgValue: minContribution,
        params: {},
    })
    // useWeb3Contract is a hook provided by moralis to access functions in smart contract

    /* View Functions */

    const { runContractFunction: getMinContribution } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getMinContribution",
        params: {},
    })

    const { runContractFunction: getPlayersNumber } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })
    const { runContractFunction: getLotteryBalance } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryBalance",
        params: {},
    })

    async function updateUIValues() {
        const minContributionFromCall = (await getMinContribution()).toString()
        const numPlayersFromCall = (await getPlayersNumber()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        const lotteryBalanceFromCall = (await getLotteryBalance()).toString();
        setMinContribution(minContributionFromCall)
        setNumberOfPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
        setLotteryBalance(lotteryBalanceFromCall);
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])
    // no list means it'll update everytime anything changes or happens
    // empty list means it'll run once after the initial rendering
    // and dependencies mean it'll run whenever those things in the list change

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",

        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>

            {lotteryAddress ? (
                <Grid
                    container
                    direction="column"
                    alignitems="center"
                    justifycontent="center"
                >
                    <Paper
                        elevation={0}
                        justifycontent="center"
                        alignitems="center"
                        sx={{
                            width: 800,
                            height: 500,
                            justifycontent: "center",
                            alignitems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h2"
                                align="center"
                                fontWeight={200}
                                mt={4}
                                mb={2}
                                ml={4}
                                p={3}
                            >
                                DECENTRALISED LOTTERY
                            </Typography>
                        </Box>
                        <Box p={3}>
                            <Typography
                                align="center"
                                variant="h4"
                                fontWeight={200}
                                mt={2}
                                mb={2}
                                ml={4}
                            >
                                No. of participants-
                                <span style={{ fontWeight: "bold" }}>{numberOfPlayers}</span>
                                <br />
                                Winning Pool-
                                <span style={{ fontWeight: "bold" }}>
                                    {ethers.utils.formatUnits(lotteryBalance, "ether")} ether
                                </span>
                            </Typography>
                        </Box>

                        <Grid container spacing={5} ml={35}>
                            <Grid item xs={7}>

                                <Button
                                    onClick={async () =>
                                        await enterLottery({

                                            onSuccess: handleSuccess,
                                            onError: (error) => console.log(error),
                                        })
                                    }
                                    disabled={isLoading || isFetching}
                                    style={{
                                        borderRadius: 3,

                                        padding: "10px 10px",
                                        fontSize: "18px",
                                    }}
                                    variant="contained"
                                    loading={isLoading || isFetching}
                                >
                                    Click to Participate
                                    <br></br>
                                    (fee : {ethers.utils.formatUnits(minContribution, "ether")}{" "}
                                    ether)
                                </Button>

                            </Grid>

                        </Grid>
                        <Box>
                            <Typography
                                variant="h6"
                                align="center"
                                fontWeight={100}
                                mt={4}
                                mb={2}
                                ml={4}
                                p={3}
                            >
                                {recentWinner.toString() !==
                                    "0x0000000000000000000000000000000000000000" &&
                                    recentWinner.toString() !== "0" ? (
                                    <h6>Last winner is {recentWinner}</h6>
                                ) : (
                                    ""
                                )}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

            ) : (
                <div>Please connect to a supported chain </div>
            )}
        </div>
    )
}

