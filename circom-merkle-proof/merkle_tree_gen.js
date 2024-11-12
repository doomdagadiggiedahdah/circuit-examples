const { buildPoseidon } = require("circomlibjs");

async function computeMerkleRoot(leaf, pathElements, pathIndices) {
    const poseidon = await buildPoseidon();
    
    // Convert initial leaf to BigInt
    let currentHash = BigInt(leaf);
    
    // For each level
    for (let i = 0; i < pathElements.length; i++) {
        const pathElement = BigInt(pathElements[i]);
        const fieldSize = BigInt(poseidon.F.p);
        
        // Keep values in field
        currentHash = currentHash % fieldSize;
        const pathElementInField = pathElement % fieldSize;
        
        // Order the inputs according to pathIndex
        let input = [];
        if (pathIndices[i] === "0") {
            input = [currentHash, pathElementInField];
        } else {
            input = [pathElementInField, currentHash];
        }
        
        // Hash the pair using Poseidon and get the hash as field element
        const hash = poseidon.F.toString(poseidon(input));
        currentHash = BigInt(hash);
    }
    
    return currentHash.toString();
}

async function main() {
    // Use small numbers that are valid field elements
    const leaf = "1";
    const pathElements = ["2", "3", "4", "5"];
    const pathIndices = ["0", "1", "0", "1"];
    
    const root = await computeMerkleRoot(leaf, pathElements, pathIndices);
    
    const input = {
        leaf,
        pathElements,
        pathIndices,
        root
    };
    
    // Output in single-line JSON format ready for bash script
    console.log("Copy this line into your script:");
    console.log(`echo '${JSON.stringify(input)}' > input.json`);
    
    // Also output pretty format for verification
    console.log("\nPretty format for verification:");
    console.log(JSON.stringify(input, null, 2));
}

main().catch(console.error);
