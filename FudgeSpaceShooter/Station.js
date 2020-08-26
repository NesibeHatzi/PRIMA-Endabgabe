"use strict";
var FudgeSpaceShooter;
(function (FudgeSpaceShooter) {
    var ƒ = FudgeCore;
    //Stationary Enemy that comes from the top to a random y position on a random x position and starts shooting.
    class Station extends FudgeSpaceShooter.Enemy {
        constructor(_name) {
            super(_name);
            this.lifePoints = 3;
            this.maxSpeed = 5;
            this.offsetY = 4;
            this.offsetX = 2;
            this.destinationReached = false;
            this.shotNumber = 1;
            this.shotDirection.y = -1;
            this.targetDestination = ƒ.Vector3.ZERO();
            this.targetDestination.x = FudgeSpaceShooter.rand.getRange(FudgeSpaceShooter.screenBottomRight.x - this.offsetX, FudgeSpaceShooter.screenTopLeft.x + this.offsetX);
            this.targetDestination.y = FudgeSpaceShooter.rand.getRange(FudgeSpaceShooter.screenTopLeft.y - this.offsetY / 2, FudgeSpaceShooter.screenTopLeft.y - this.offsetY);
            let direction = ƒ.Vector3.ZERO();
            // let timeDelta: number = ƒ.Loop.timeFrameGame / 1000;
            direction.x = (this.cmpTransform.local.translation.x - this.targetDestination.x);
            direction.y = (this.cmpTransform.local.translation.y - this.targetDestination.y);
        }
        attack() {
            if (this.destinationReached) {
                let timeDelta = ƒ.Loop.timeFrameGame / 1000;
                if (this.shotCountdown >= this.shotTime) {
                    for (let i = 0; i < this.shotNumber; i++) {
                        // let enemyZap:HTMLAudioElement = document.querySelector("#enemyzap");
                        // enemyZap.play();
                        let bullet = new FudgeSpaceShooter.EnemyBullet("EnemyBullet", this.cmpTransform.local.translation, this.shotDirection, ƒ.Color.CSS("GREEN"));
                        FudgeSpaceShooter.bullets.addChild(bullet);
                        this.shotDirection.x = FudgeSpaceShooter.rand.getRange(-1, 1);
                        ;
                    }
                    this.shotCountdown = 0;
                }
                else if (this.shotCountdown < this.shotTime) {
                    this.shotCountdown += timeDelta;
                }
            }
        }
        move() {
            if (this.destinationReached == false) {
                let currentPos = this.cmpTransform.local.translation;
                let distance = ƒ.Vector3.DIFFERENCE(currentPos, this.targetDestination);
                let timeDelta = ƒ.Loop.timeFrameGame / 1000;
                let direction = ƒ.Vector3.ZERO();
                direction.x = distance.x < 0 ? 1 : -1;
                direction.y = distance.y < 0 ? 1 : -1;
                // console.log(distance.magnitude);
                if (distance.magnitude > 0.5) {
                    direction.scale(this.maxSpeed);
                }
                direction.scale(timeDelta);
                if (distance.magnitude < 0.1)
                    this.destinationReached = true;
                // console.log(direction.toString());
                this.cmpTransform.local.translate(direction);
            }
        }
    }
    FudgeSpaceShooter.Station = Station;
})(FudgeSpaceShooter || (FudgeSpaceShooter = {}));
//# sourceMappingURL=Station.js.map