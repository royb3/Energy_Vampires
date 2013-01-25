function Player(id, username, lng, lat, score, team, nickname) {
	private var this.playerId = id,
		this.username = username,
		this.lng = lng,
		this.lat = lat,
		this.score = score,
		this.team = team,
		this.nickname = nickname;

		public function addScore(value)
		{
			this.score += value;
		}

		public function drainScore(value)
		{
			this.score -= value;
		}

		public function switchTeam(team)
		{
			this.team = team;
		}

		public function updateLocation(location)
		{
			this.lng = location.lng;
			this.lat = location.lat;
		}

		public function getLocationPoint()
		{
			return "{" + this.lng + "," + this.lat + "}";
		}

		public getId() { return this.playerId; }
		public getUsername() { return this.username; }
		public getLng() { return this.lng; }
		public getLat() { return this.lat; }
		public getScore() { return this.score; }
		public getTeam() { return this.team; }
		public getNickname() { return this.nickname; }
		public setNickname(value) { this.nickname = value; }
}