function Player(id, username, lng, lat, score, team, nickname) {
	var playerId = id,
		username = username,
		lng = lng,
		lat = lat,
		score = score,
		team = team,
		nickname = nickname;
		isReady = false;

		function addScore(value)
		{
			score += value;
		}

		function drainScore(value)
		{
			score -= value;
		}

		function switchTeam(team)
		{
			team = team;
		}

		function updateLocation(location)
		{
			lng = location.lng;
			lat = location.lat;
		}

		function getLocationPoint()
		{
			return "{" + lng + "," + lat + "}";
		}

		function getId() { return playerId; }
		function getUsername() { return username; }
		function getLng() { return lng; }
		function getLat() { return lat; }
		function getScore() { return score; }
		function getTeam() { return team; }
		function getNickname() { return nickname; }
		function setNickname(value) { nickname = value; }
		function getIsReady() { return isReady; }
}