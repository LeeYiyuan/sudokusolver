function Solver() {
    this.count = 0;

    this.working_grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
};

Solver.prototype.validate_row = function (current_row, current_column) {
    var value = this.working_grid[current_row][current_column];
    for (var column = 0; column < 9; column++) {
        if (column != current_column && this.working_grid[current_row][column] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_column = function (current_row, current_column) {
    var value = this.working_grid[current_row][current_column];
    for (var row = 0; row < 9; row++) {
        if (row != current_row && this.working_grid[row][current_column] == value) {
            return false;
        }
    }
    return true;
};

Solver.prototype.validate_box = function (current_row, current_column) {
    var value = this.working_grid[current_row][current_column];
    var box_row = Math.floor(current_row / 3);
    var box_column = Math.floor(current_column / 3);

    for (var row = box_row * 3; row < box_row * 3 + 3; row++) {
        for (var column = box_column * 3; column < box_column * 3 + 3; column++) {
            if (row != current_row && column != current_column && this.working_grid[row][column] == value) {
                return false;
            }
        }
    }
    return true;
};

Solver.prototype.backtrack = function (current_row, current_column) {
    current_column++;
    if (current_column > 8) {
        current_column = 0;
        current_row++;
        if (current_row > 8) {
            return true;
        }
    }

    if (this.working_grid[current_row][current_column] != 0) {
        if (!(this.validate_row(current_row, current_column) && this.validate_column(current_row, current_column) && this.validate_box(current_row, current_column))){
            // Anti-monkey. In case input was invalid.
            return false;
        }
        return this.backtrack(current_row, current_column);
    } else {
        for (var x = 1; x < 10; x++) {
            this.count++;
            this.working_grid[current_row][current_column] = x;
            if (this.validate_row(current_row, current_column) &&  this.validate_column(current_row, current_column) && this.validate_box(current_row, current_column)){
                if (this.backtrack(current_row, current_column)) {
                    return true;
                }
            }
        }
        this.working_grid[current_row][current_column] = 0;
        return false;
    }
};

Solver.prototype.solve = function () {
    return this.backtrack(0, -1);
};