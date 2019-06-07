// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var curRow = this.rows();
      curRow = curRow[rowIndex];
      var chessCount = curRow.reduce(function(accum, cur) {
        return accum += cur;
      }, 0);

      if (chessCount > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var curBoard = this.rows();
      for (var i = 0; i < curBoard.length; i ++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var curBoard = this.rows();
      var curColCount = curBoard.reduce(function(accum, cur) {
        return accum += cur[colIndex];
      }, 0);

      if (curColCount > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      if (this.rows().length === 0) {
        return false;
      }
      var curBoard = this.rows();
      var colCount = curBoard[0].length;

      while (colCount >= 0) {
        if (this.hasColConflictAt(colCount)) {
          return true;
        }
        colCount --;
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var curBoard  = this.rows();
      var curCol;
      var startingRow;

      // if it's positive --> assume starting at row 0;
      if (majorDiagonalColumnIndexAtFirstRow > 0) {
        startingRow = 0;
        curCol = majorDiagonalColumnIndexAtFirstRow;
      }
      // if it's negative --> we need to make use of this negative column index to get the starting row --> absolute this index thing
      else {
        startingRow = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        curCol = 0;
      }

      var count = 0;
      for (var i = startingRow; i < curBoard.length; i++) {
        if (curCol < curBoard.length) {
          count += curBoard[i][curCol];
          curCol ++;
        }
        if (count >= 2) {
          return true;
        }
      } 
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var curBoard = this.rows();

      // find absolute starting point
      var absStarting = -(curBoard.length - 1);

      for (var i = absStarting; i < curBoard.length; i ++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var curBoard = this.rows();
      var curCol = minorDiagonalColumnIndexAtFirstRow;
      var startingRow;

      if (minorDiagonalColumnIndexAtFirstRow > curBoard.length - 1) {
        startingRow = curCol - curBoard.length + 1;
        curCol = minorDiagonalColumnIndexAtFirstRow - startingRow;
      } else {
        startingRow = 0;
      }

      var count = 0;
      for (var i = startingRow; i < curBoard.length; i++) {
        if (curCol >= 0) { // need to check if curCol is valid
          count += curBoard[i][curCol];
          curCol --;
        }
        if (count >= 2) {
          return true;
        }
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var curBoard = this.rows();

      // find absolute starting point
      var newLength = curBoard.length * 2 - 1;

      for (var i = 0; i < newLength; i ++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
