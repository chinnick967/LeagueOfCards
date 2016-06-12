function Card (data) {
    this.src = data.Image;
    this.armor = data.armor;
    this.attack = data.attack;
    this.cardID = data.cardID;
    this.cost = data.cost;
    this.damagetype = data.damagetype;
    this.defense = data.defense;
    this.magicresist = data.magicresist;
    this.name = data.name;
    this.type = data.type;
    this.asset = null;
    this.back = '';
    // TODO change activated to boolean.
    this.activated = 0;
}

Card.prototype.loadAsset = function () {
    var $this = this;
    return new Promise(function (resolve) {
        var image = new Image();
        image.onload = function () {
            resolve(image);
            $this.asset = image;
        };
        image.src = $this.src;
    });
};