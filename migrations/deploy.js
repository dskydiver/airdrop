// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

const anchor = require('@coral-xyz/anchor')
const IDL = require('../target/idl/airdrop.json')

const programId = '9phkZpkzQ4zm8YZ2degnhnTx7dhR6AUmgyBPTVSc4kNr'

module.exports = async function (provider) {
  // Configure client to use the provider.
  anchor.setProvider(provider)

  console.log(
    provider.publicKey.toBase58(),
    anchor.Wallet.local().publicKey.toBase58()
  )

  const program = new anchor.Program(
    IDL,
    new anchor.web3.PublicKey(programId),
    provider
  )

  console.log(program.programId.toBase58())

  const [airdropData] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('airdrop_data')],
    program.programId
  )

  const emitter_address = '0x00000000000000000000000000000000deadbeef'
  const nft1 = '0x00000000000000000000000000000000deadbeef'
  const nft2 = '0x00000000000000000000000000000000deadbeef'

  const amount1 = new anchor.BN(100)
  const amount2 = new anchor.BN(100)

  const mint = new anchor.web3.PublicKey(
    '9phkZpkzQ4zm8YZ2degnhnTx7dhR6AUmgyBPTVSc4kNr'
  )

  const tx = await program.methods
    .initialize(emitter_address, nft1, nft2, amount1, amount2)
    .accounts({
      airdropData,
      payer: provider.publicKey,
      mint,
    })
    .signers([anchor.Wallet.local()])
    .rpc()

  // Add your deploy script here.
}
