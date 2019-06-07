/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var board = new Board({'n': n});
  var solution = board.rows();


  // always starts at 0, each loop both row and col plus one
  var col = 0;
  for (var i = 0; i < n; i++) {
    solution[i][col] ++;
    col ++;
  }
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // use bit map to implement the count solution method

  var colMarker = new Array(n).fill(0);

  var findSolutionCount = function (row) {
    var hasOneSolution = 0;
    if (row >= n ) {
      return 1;
    }

    for (var col = 0; col < n; col ++) {
      // we go to the next row only if the cur col is zero
      if (colMarker[col] === 0) {
        // if cur col is zero, then we first mark it as one, then we call recursively
        colMarker[col] = 1;
        hasOneSolution += findSolutionCount(row + 1);
        // after finding the solution count from current move, toggle back to zero
        colMarker[col] = 0;
      }
    }

    return hasOneSolution;
  }

  var solution = findSolutionCount(0);

  console.log('Number of solutions for ' + n + ' rooks:', solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var chessBoard = new Board({n:n});

  if (n === 0 || n === 2 || n === 3) {
    return chessBoard.rows();
  } else if (n === 1) {
    return [[1]];
  }

  var findSolution = function (row) {
    if (row >= n) {
      return chessBoard.rows();
    }

    for (var col = 0; col < n; col ++) {
      chessBoard.togglePiece(row, col);
      if (!chessBoard.hasAnyQueensConflicts()) {
        var result = findSolution(row + 1);
        // eveluate if return result is a chessboard or not, but yes, return the chess board
        if (result !== null) {
          return result;
        }
      }
      chessBoard.togglePiece(row, col);
    }

    // if for loop is done but does not reach last row with valid move, need to return null
    return null;
  }

  var solution = findSolution(0); 
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {  
  var chessBoard = new Board({'n': n});

  // we will use this function recursively to add chess to board
  // we will apply the hasConflict method from Board.js to check if current move is valid before moving on to next step
  var findSolutionCount = function (row) {
    var hasOneSolution = 0;
    if (row >= n ) {
      return 1;
    }

    for (var col = 0; col < n; col ++) {
      chessBoard.togglePiece(row, col);
      if (!chessBoard.hasAnyQueensConflicts()) {
        hasOneSolution += findSolutionCount(row + 1);
      }
      chessBoard.togglePiece(row, col);
    }

    return hasOneSolution;
  }

  var solution = findSolutionCount(0);

  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};
