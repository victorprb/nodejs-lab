class Electors {
    constructor(total) {
        this.total = total
    }
}

class Votes {
    constructor(valid, blank, nil) {
        this.valid = valid
        this.blank = blank
        this.nil = nil
    }
}

class Election {
    constructor(electors, votes) {
        this.electors = electors
        this.votes = votes
    }

    validVotesRate() {
        return this.votes.valid / this.electors.total
    }

    blankVotesRate() {
        return this.votes.blank / this.electors.total
    }

    nullVotesRate() {
        return this.votes.nil / this.electors.total
    }
}

const electors = new Electors(1000)

const votes = new Votes(800, 150, 50)

const election = new Election(electors, votes)

console.log(`Total electors: ${election.electors.total}`)
console.log(`Valid votes rate: ${election.validVotesRate() * 100}%`)
console.log(`Blank votes rate: ${election.blankVotesRate() * 100}%`)
console.log(`Null votes rate: ${election.nullVotesRate() * 100}%`)
