// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

const anchor = require('@coral-xyz/anchor')
const IDL = require('../target/idl/airdrop.json')
const {
  createAccount,
  createMint,
  getAssociatedTokenAddressSync,
  mintTo,
} = require('@solana/spl-token')
const { Keypair, PublicKey, PublicKeyInitData } = require('@solana/web3.js')

const programId = '9phkZpkzQ4zm8YZ2degnhnTx7dhR6AUmgyBPTVSc4kNr'

module.exports = async function (provider) {
  // Configure client to use the provider.
  anchor.setProvider(provider)

  const owner = anchor.Wallet.local()

  console.log(
    provider.publicKey.toBase58(),
    anchor.Wallet.local().publicKey.toBase58()
  )

  const program = new anchor.Program(
    IDL,
    new anchor.web3.PublicKey(programId),
    provider
  )

  const tokenMint = await createMint(
    provider.connection,
    owner,
    owner.publicKey,
    null,
    0
  )

  const sourceAccount = await createAccount(
    anchor.getProvider().connection,
    owner,
    tokenMint,
    owner.publicKey
  )

  await mintTo(
    anchor.getProvider().connection,
    owner,
    tokenMint,
    sourceAccount,
    owner,
    1000000000
  )

  const [airdropData] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('airdrop_data')],
    program.programId
  )

  const emitter_address = '0x00000000000000000000000000000000deadbeef'
  const nft1 = '0x00000000000000000000000000000000deadbeef'
  const nft2 = '0x00000000000000000000000000000000deadbeef'

  const amount1 = new anchor.BN(100)
  const amount2 = new anchor.BN(100)

  const tx = await program.methods
    .initialize(emitter_address, nft1, nft2, amount1, amount2)
    .accounts({
      airdropData,
      payer: owner.publicKey,
      mint: tokenMint,
    })
    .signers([owner])
    .rpc()

  const [destinationAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from('airdrop'), tokenMint.toBuffer()],
    program.programId
  )
  
  await program.methods
    .deposit(new anchor.BN(1000000000))
    .accounts({
      airdropData,
      payer: owner.publicKey,
      sourceAccount,
      destinationAccount,
      mint: tokenMint,
      tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([owner])
    .rpc()
}
