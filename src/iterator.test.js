/**
 * Iterator
 * Object that stores a kind of complex data structure
 * internally and exposes an API of conventional methods
 * to interact with that
 */
function BookShell (value) {
    if (!(value instanceof Array)) {
        throw new Error('This object manages only arrays');
    }
    this.data = value || null;
    this.index = 0;
}

BookShell.prototype.next = function () {
    if (!this.hasNext()) {
        return null;
    }

    var el = this.data[this.index];
    this.index++;
    return el;
}

BookShell.prototype.hasNext = function () {
    var l = this.data.length;

    switch (true) {
        case this.data === null:
        case l <= this.index:
            return false;
            break;
        case l > this.index:
        default:
            return true;
    }
}

BookShell.prototype.current = function () {
    var el = this.data[this.index];
    return el || null;
}

BookShell.prototype.rewind = function () {
    this.index = 0;
}

describe('Iterator tests', () => {
    
    var SciFi,
        books;

    beforeEach(() => {
        books = [
            {title: 'From Earth to the Moon', author: 'J Verne'},
            {title: '1984', author: 'G Orwells'},
            {title: 'The War of the Worlds', author: 'H Wells'},
            {title: 'The Martian Chronicles', author: 'R Bradbury'}
        ];
        SciFi = new BookShell(books);
    })

    test('accepts only data it can manage', () => {
        expect((function () {
            new BookShell({});
        })).toThrow();
    });

    test('hasNext tells if there next item', () => {
        expect(typeof SciFi.hasNext).toBe('function');
        expect(SciFi.hasNext()).toBeTruthy();
    });

    test('next method should move to the next item', () => {
        expect(SciFi.next()).toMatchObject(books[0]);
        expect(SciFi.next()).toMatchObject(books[1]);
        expect(SciFi.next()).toMatchObject(books[2]);
        expect(SciFi.next()).toMatchObject(books[3]);
        expect(SciFi.next()).toBe(null);
    });

    test('current method returns item for current index or null, and does not move cursor', () => {
        expect(SciFi.next()).toMatchObject(books[0]);
        expect(SciFi.current()).toMatchObject(books[1]);
        expect(SciFi.next()).toMatchObject(books[1]); //same than before
    });

    test('rewind to the initial position', () => {
        while (SciFi.hasNext()) {
            SciFi.next();
        }
        SciFi.rewind();
        expect(SciFi.current()).toMatchObject(books[0]);
    });
});