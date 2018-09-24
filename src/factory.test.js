    /**
     * Factory
     * Mechanism to create objects which are subtype of
     * a type of object. It could be a class or method of it.
     */

    // this is the general constructor
    function Book () {
        this._ISBN = null;
    }

    // now create subtype constructors using STATIC props
    Book.Novel = function () {

    }

    Book.Poetry = function () {

    }

    // useful map of subtypes available
    Book.EnumTypes = {
        'Novel': 'Novel',
        'Poetry': 'Poetry'
    }

    // shared methods
    Book.prototype.addMetadata = function (val) {
        this.title = val.title;
        this.author = val.author;
    }

    // getter / setter
    Book.prototype.ISBN = function (val) {
        if (typeof val === 'undefined') {
            return this._ISBN;
        }
        this._ISBN = val;
    }

    // static method prop that build the objects 
    Book.factory = function (type) {
        if (!(typeof Book[type] === 'function')) {
            throw new Error();
        }

        // ..
        if (typeof Book[type].prototype.ISBN !== 'function') {
            Book[type].prototype = new Book();            
        }

        return new Book[type]();
    }

    describe('Factory tests', () => {
        
        test('create an object of the specific subtype', () => {
            var Contact = Book.factory(Book.EnumTypes.Novel);
            // creates an object of the subtype
            expect(Contact).toBeInstanceOf(Book.Novel);
            // get access to shared methods from the highest parent
            Contact.ISBN('12-4542-4846');
            expect(Contact.ISBN()).toBe('12-4542-4846');
        });

        test('create object of the second subtype', () => {
            var _1984 = Book.factory(Book.EnumTypes.Novel);
            var IKnowWhyTheCagedBirdSings = Book.factory(Book.EnumTypes.Poetry);

            expect(_1984).toBeInstanceOf(Book.Novel);
            expect(IKnowWhyTheCagedBirdSings).toBeInstanceOf(Book.Poetry);
        });

    });