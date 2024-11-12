# install
- https://noir-lang.org/docs/getting_started/quick_start/
- these notes are from v0.36.0; og notes were fairly different, so if these are too check versioning.
- also needed to run `sudo apt-get install libc++-dev libc++abi-dev` to get `bb` to work
- and adding the folder to my PATH `set -x PATH $PATH $HOME/.bb; source ~/.config/fish/config.fish`

# Noir
Build: `nargo check`
Prove: set up inputs in `Prover.toml` and run `nargo execute`. (quick start uses bb proving backend)`` to show println logs.
- sample: 
```Prover.toml
expect = "11"
x = ["1", "2"]
y = ["3", "4"]
```
...then run `bb prove -b target/nargo_dot_product.json -w target/nargo_dot_product.gz -o target/proof`
      
Verify: 
```
bb write_vk -b ./target/nargo_dot_product.json -o target/vk
bb verify -k target/vk -p target/proof
```

## Notes on Noir
Main wows:
- It's really easy to get up and running, this example dotproduct took me 5 minutes to read the docs and 2 minutes to write
- The language reads similarly to the Rhai scripting language, which is excellently designed and easy to write
- Type Generics (wow)
- Closures and functional tooling (wow!)
- Sane testing (!!)
- Very readable docs (!!!)
- Sane package management

Main gripes:
- I can't `nargo new` without a Nargo.toml already present in the directory? definitely a bug
- Downloading a 300mb srs to my home directory, not XDG_CONFIG, not .nargo, but my home directory, feels rude

And those gripes seem like easily fixable bugs. Great language.
