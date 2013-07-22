var User = function( args ) {
    this.name = args.name;
    this.sex = args.sex;
}

User.prototype.getName = function() {
    console.dir( this.name );
};

var ninja = new User({name: "ninga", sex: "male"});

console.dir( ninja.constructor === User );
