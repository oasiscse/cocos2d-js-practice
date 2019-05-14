var INITIALIZED_2 = false;

var bar, man, main_bg, main_bg1;
var hoz1, hoz2, size;
var bgMove, bgMove1;
var barMove, bar_h;
var bar1, bar2, bar3, bar4, bar5, bar6, bar7, bar8, man_w, man_h;
var score, slabel;

var flag = 0;
var bar1_w, bar1_h, bar2_w, bar2_h, bar3_w, bar3_h, bar4_w, bar4_h;
var speed;

var man_menuItem, man_menu;
var gameover = false;

var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();


        size = cc.winSize;
        bgMove = size.height/2;
        bgMove1 = size.height;
        barMove = size.height-100;
        man_w = 100;
        man_h = size.height/2 - 100;

        bar1_w = size.width-100;
        bar1_h = size.height - 298;

        bar2_w = 60;
        bar2_h = size.height/2 - 238;

        bar3_w = size.width/2 - 200;
        bar3_h = size.height;

        bar4_w = size.width/2 + 200;
        bar4_h = size.height/2 - 100;

        speed = 3.5;
        score = 0;

        slabel = new cc.LabelTTF("Score: 0", "Arial", 25); 
        slabel.setPosition(cc.p(size.width/2, size.height - 50));
        //this.addChild(slabel, 5);

        man = new cc.Sprite.create(res.Man);
        man.setPosition(cc.p(man_w, man_h));
        this.addChild(man, 1);

        main_bg = new cc.Sprite.create(res.Main_bg);
        main_bg.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(main_bg, 0);

        main_bg1 = new cc.Sprite.create(res.Main_bg1);
        main_bg1.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(main_bg1, 0);


        bar1 = new cc.Sprite.create(res.Bar1);
        bar1.setPosition(cc.p(bar1_w, bar1_h));
        this.addChild(bar1,1);

        bar2 = new cc.Sprite.create(res.Bar2);
        bar2.setPosition(cc.p(cc.p(bar2_w, bar2_h)));
        this.addChild(bar2,1);

        bar3 = new cc.Sprite.create(res.Bar3);
        bar3.setPosition(bar3_w, bar3_h);
        this.addChild(bar3, 1);


        bar4 = new cc.Sprite.create(res.Bar4);
        bar4.setPosition(bar4_w, bar4_h);
        this.addChild(bar4, 1);

        bar5 = new cc.Sprite.create(res.Bar4);
        bar5.setPosition(60, size.height);
        this.addChild(bar5, 1);





        //game end menu
        man_menuItem = new cc.MenuItemImage(res.GameOver, res.GameOver, res.GameOver);
        
        man_menuItem.setVisible(false);
        man_menu = new cc.Menu(man_menuItem);

        man_menu.alignItemsVertically();
        man_menu.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(man_menu, 1);


        this.scheduleUpdate();


        if(cc.sys.capabilities.hasOwnProperty("mouse")){
            
            cc.eventManager.addListener({

                event: cc.EventListener.MOUSE,

                onMouseDown: function(event){

                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
     
                                man_w = man.getPosition().x;
                                man_w -= 100;
                                man_h = man.getPosition().y;
                                man_h += 100; //100


            }
          },
                onMouseUp: function(event){

                    if(event.getButton() == cc.EventMouse.BUTTON_RIGHT){


                                man_w = man.getPosition().x;
                                man_w += 100;
                                man_h = man.getPosition().y;
                                man_h += 90; //90
 

            }
          }
            }, this);
        }


        return true;
    },

    update: function(){

        var rect1 = man.getBoundingBox();
        var rect3 = bar1.getBoundingBox();
        var rect4 = bar2.getBoundingBox();
        var rect5 = bar3.getBoundingBox();
        var rect6 = bar4.getBoundingBox();
        var rect7 = bar5.getBoundingBox();


        if(gameover == false){

        //newly added code starts
        man_h -= speed;


        if(man_w <= 0 || man_w >= size.width || man_h >= size.height) gameover = true;

        man.setPosition(cc.p(man_w, man_h));
        //man.applyForce(createVector(0, GRAVITY));

        if(cc.rectIntersectsRect(rect1, rect3) &&  bar1.getPosition().y < man.getPosition().y - 35){
            speed = 0;
           
        }
        else if(cc.rectIntersectsRect(rect1, rect4) &&  bar2.getPosition().y < man.getPosition().y - 35){
            speed = 0;
            
        }
        else if(cc.rectIntersectsRect(rect1, rect5) && bar3.getPosition().y < man.getPosition().y-35){
            speed = 0;
        }
        else if(cc.rectIntersectsRect(rect1, rect6) && bar4.getPosition().y < man.getPosition().y-35){
            speed = 0;
        }
        else if(cc.rectIntersectsRect(rect1, rect7) && bar5.getPosition().y < man.getPosition().y-35){
            speed = 0;
        }

        else speed = 3.5;


        if(man_h <= 20 ){

                gameover = true;
        }


                            slabel.setString("Score: "+ score);
        
                            bgMove1 -= 1.8;
                            bgMove -= 1.8;
                            bar1_h -= 1.05;
                            bar2_h -= 1.05;
                            bar3_h -= 1.05;
                            bar4_h -= 1.05;

                            bar1.setPosition(bar1_w, bar1_h);
                            bar2.setPosition(bar2_w, bar2_h);
                            bar3.setPosition(bar3_w, bar2.getPosition().y + 200);
                            bar4.setPosition(bar4_w, bar1.getPosition().y + 200);
                            bar5.setPosition(60, bar3.getPosition().y + 300);

                            if(bar1_h <= -200) bar1_h = size.height;
                            if(bar2_h <= -200) bar2_h = size.height;
                            if(bar3_h <=0) bar3_h = size.height + 100;
                            if(bar4_h <= 0) bar4_h = size.height + 300;


                            main_bg.setPosition(size.width/2, bgMove);
                            if(bgMove <= 0) bgMove = size.height;

                            main_bg1.setPosition(size.width/2, bgMove1);
                            if(bgMove1 <=0) bgMove1 = size.height;

        }

        else{

            man_menuItem.setVisible(true);
        }
    }

});

var HelloWorldScene2 = cc.Scene.extend({ 
    onEnter:function () {
        this._super();
        if(INITIALIZED_2 == false){

            INITIALIZED_2 = true;
            var layer = new HelloWorldLayer2();
            this.addChild(layer);
        }
    }
});
