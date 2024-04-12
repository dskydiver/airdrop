// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

import * as anchor from '@coral-xyz/anchor'
import { Airdrop } from '../target/types/airdrop'

module.exports = async function (provider: anchor.Provider) {
  // Configure client to use the provider.
  anchor.setProvider(provider)

  console.log(provider.publicKey)

  // const program = anchor.workspace.Airdrop as anchor.Program<Airdrop>

  // console.log(program.programId)

  // const [airdropData] = anchor.web3.PublicKey.findProgramAddressSync(
  //   [Buffer.from('airdrop_data')],
  //   program.programId
  // )

  // const emitter_address = '0x00000000000000000000000000000000deadbeef';
  // const nft1 = '0x00000000000000000000000000000000deadbeef'
  // const nft2 = '0x00000000000000000000000000000000deadbeef'

  // const amount1 = new anchor.BN(100)
  // const amount2 = new anchor.BN(100)

  // const mint = new anchor.web3.PublicKey('')

  // const tx = await program.methods.initialize(
  //   emitter_address,
  //   nft1,
  //   nft2,
  //   amount1,
  //   amount2
  // ).accounts({
  //   airdropData,
  //   payer: provider.publicKey
  // }).rpc()

  // Add your deploy script here.
}
