
function Entity(type) {
	this.type = type;
	this.id = Entity.IdCount++;
};

Entity.IdCount = 0;


function Coord(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

module.exports = Entity;

