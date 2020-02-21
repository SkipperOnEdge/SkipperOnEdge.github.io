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

}

class DataPoint { // Use this to add game stats to class
	constructor(data, name=null, category) {
		this.data = data;
		if(name){
			this.name = name;
		} else {
			this.name = null;
		}
		this.category = category; // => auto, pointScoring, movement, penalties, endGame
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
			throw new Error("Must supply name to add data point to game.")
		}
		this[name] = dataPoint;
	}
}