const GAME_ID_LENGTH = 16; // (((SET THIS)))
const CATEGORIES = ["auto", "pointScoring", "movement", "penalties", "endGame"] // (((SET THIS)))


function generateGameId(){
	id = ""
	chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&*()"
	for(var i = 0; i < GAME_ID_LENGTH; i++){
	id += chars[Math.floor(Math.random()*chars.length)]
	}
	return id
} 

function getGame(gameId) {
	// (((SET THIS)))
	return undefined;
}


class Robot { // Register robot to game w/ this class
	constructor(teamNumber, matchNumber, alliance, games=null) {
		this.teamNumber = teamNumber;
		this.matchNumber = matchNumber;
		this.alliance = alliance;
		this.games = games;
	}

	addGame(gameId) {
		this.games.push(gameId)
	}

	getAllGames() {
		var games = [];
		this.games.forEach(id => games.push(getGame(id)));
		return games;
	}

}

class DataPoint { // Use this to add game stats to class
	constructor(data, name=null, category) {
		this.data = data;
		if(name){
			this.name = name;
		} else {
			this.name = null;
		}
		this.category = category; // => auto, pointScoring, movement, penalties, endGame (((WRITE CATEGORIES)))
		this.given = !!data; // If user supplies stat
	}
}


class Game {
	constructor(robot, gameId=generateGameId()){
		this.gameId = gameId;
		robot.addGame(gameId)
	}

	addAllDataPoints(crossedPointLine, scoredLow, scoredHex, scoredInner, 
		controlRotation, controlPosition, timeUnderTrench, timeCrossCentral,
		timeDefend, fouls, techFouls, yellowCard, redCard, climb, inBalance, parked){
		this.dataPoints = arguments;
		this.crossedPointLine = crossedPointLine;
		this.scoredLow = scoredLow;
		this.scoredHex = scoredHex;
		this.scoredInner = scoredInner;
		this.controlRotation = controlRotation;
		this.controlPosition = controlPosition;
		this.timeUnderTrench = timeUnderTrench;
		this.timeCrossCentral = timeCrossCentral;
		this.timeDefend = timeDefend;
		this.fouls = fouls;
		this.techFouls = techFouls;
		this.yellowCard = yellowCard;
		this.redCard = redCard;
		this.climb = climb;
		this.inBalance = inBalance;
		this.parked = parked;

	}	

	addDataPoint(dataPoint, name=dataPoint.name) {
		if(!name) {
			return null;
		}

		this[name] = dataPoint;
		return this[name]
	}

	getDataPointsByCategory(category) {
		if(CATEGORIES.indexOf(category) === -1) return null;
		return this.stats.filter(x => x.category === category)
	}

	getTotalPoints() {
		let pointMap = {"low": 1 , "hex": 2, "inner": 4} // (((SET THIS)))
		let points;
		points += this.scoredLow*pointMap["low"]
		points += this.scoredHex*pointMap["hex"]
		points += this.scoredInner*pointMap["inner"]
		return points
	}


}
