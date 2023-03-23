#![no_main]
#![no_std] // this seems

use merkle_core::Args;
use risc0_zkvm::guest::env;

risc0_zkvm::guest::entry!(main);

pub fn main() {
    let args: Args = env::read();
    let c: u64 = args.merkle();
    assert!(c == 11); // hard code the check for demo

    env::commit(&c);
}
