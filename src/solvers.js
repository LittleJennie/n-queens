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
  var chessBoard = new Board({'n': n});
  var chessCount = 0;

  // we will use this function recursively to add chess to board
  // we will apply the hasConflict method from Board.js to check if current move is valid before moving on to next step
  var findSolutionCount = function (row) {
    var hasOneSolution = 0;
    if (row >= n && chessCount === n) {
      hasOneSolution = 1;
      return hasOneSolution;
    }

    if (row >= n && chessCount !== n) {
      hasOneSolution = 0;
      return hasOneSolution;
    }

    for (var col = 0; col < n; col ++) {
      chessBoard.togglePiece(row, col);
      chessCount++;
      if (!chessBoard.hasAnyRooksConflicts()) {
        var newRow = row + 1;
        hasOneSolution += findSolutionCount(newRow);
      }
      chessBoard.togglePiece(row, col);
      chessCount--;
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
  var chessCount = 0;

  if (n === 0 || n === 2 || n === 3) {
    return chessBoard.rows();
  } else if (n === 1) {
    return [[1]];
  }

  var findSolutionCount = function (row) {
    
    var hasOneSolution = [];
    if (row >= n && chessCount === n) {
      var curSolutionBoard = chessBoard.rows();
      // hasOneSolution = 1;
      var ansArr = JSON.stringify(curSolutionBoard);
      // console.log(ansArr)
      return ansArr;
    }

    if (row >= n && chessCount !== n) {
      // hasOneSolution = 0;
      return [];
    }

    for (var col = 0; col < n; col ++) {
      chessBoard.togglePiece(row, col);
      chessCount++;
      if (!chessBoard.hasAnyQueensConflicts()) {
        var newRow = row + 1;
        hasOneSolution = hasOneSolution.concat(findSolutionCount(newRow));
      }
      chessBoard.togglePiece(row, col);
      chessCount--;
    }
    return hasOneSolution;
  }

  var solution = findSolutionCount(0); 
  solution = solution.pop();
  console.log(solution, "here")
  solution = JSON.parse(solution);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {  
  var chessBoard = new Board({'n': n});
  var solution = 0;
  var chessCount = 0;

  // we will use this function recursively to add chess to board
  // we will apply the hasConflict method from Board.js to check if current move is valid before moving on to next step
  var findSolutionCount = function (row) {
    var hasOneSolution = 0;
    if (row >= n && chessCount === n) {
      hasOneSolution = 1;
      return hasOneSolution;
    }

    if (row >= n && chessCount !== n) {
      hasOneSolution = 0;
      return hasOneSolution;
    }

    for (var col = 0; col < n; col ++) {
      chessBoard.togglePiece(row, col);
      chessCount++;
      if (!chessBoard.hasAnyQueensConflicts()) {
        var newRow = row + 1;
        hasOneSolution += findSolutionCount(newRow);
      }
      chessBoard.togglePiece(row, col);
      chessCount--;
    }

    return hasOneSolution;
  }

  console.log('Number of solutions for ' + n + ' queens:', solution);
  return findSolutionCount(0);
};


  // try 4
  // window.countNQueensSolutions = function(n) {  
  //   var chessBoard = new Board({'n': n});
  //   var solution = 0;
  //   var chessCount = 0;
  //   // helper function should take __ arguments
  //   // 1. n
  //   // 2. rowCount
  //   // 3. total onBoardChessCount
  //   // 4. paintedChessBoard
  //   // 5. solutionCount
  
  //   // we will use this function recursively to add chess to board
  //   // we will apply the hasConflict method from Board.js to check if current move is valid before moving on to next step
  //   var findSolutionCount = function (row = 0, col = 0) {
  //     if (row === n - 1 && col === n - 1 && chessCount === n) {
  //       return 1;
  //     }
  //     if (row === n - 1 && col === n - 1 && chessCount !== n) {
  //       return 0;
  //     }
  //     for (var i = row; i < n; i++) {
  //       for (var j = col; j < n; j++) {
  //         chessBoard.togglePiece(row, col);
  //         if (!chessBoard.hasAnyQueensConflicts()) { // if the current placement is valid
  //           if (col === n - 1) {
  //             solution += findSolutionCount(++row, 0);
  //           } else {
  //             solution += findSolutionCount(row, ++col);
  //           }
  //         } else {
  //           chessBoard.togglePiece(row, col);
  //         }
  //       }
  //     }
      
  
  //     // return solution;
  //   }
  
  //   // solution = findSolutionCount(0,0);
  //   console.log('Number of solutions for ' + n + ' queens:', solution);
  //   return solution;
  // };