import $ from 'jquery';
import Chance from 'chance';

const chance = new Chance();

const GuessingGameModule = (function($, chance) {
    let secretNumber;
    let attemptCount;
    const maxAttempts = 3;

    function initializeGame() {
        secretNumber = chance.integer({ min: 1, max: 10 });
        console.log("[Gratspiel] Secret number set!");
        attemptCount = 0;
        setupModeToggle();
        setupEventHandlers();
        restoreModeFromLocalStorage();
    }

    function setupModeToggle() {
        console.log("[Gratspiel] Setting up mode toggle...");
        $('#modeToggle').off('click').on('click', function() {
            console.log("[Gratspiel] Mode toggle clicked.");
            $('body').toggleClass('dark-mode');
            if ($('body').hasClass('dark-mode')) {
                console.log("[Gratspiel] Switching to dark mode.");
                $('#modeToggle').removeClass('fa-moon').addClass('fa-sun');
                localStorage.setItem('darkMode', 'true');
            } else {
                console.log("[Gratspiel] Switching to light mode.");
                $('#modeToggle').removeClass('fa-sun').addClass('fa-moon');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }

    function restoreModeFromLocalStorage() {
        const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
        console.log(`[Gratspiel] Restoring mode from localStorage: ${darkModeEnabled}`);
        if (darkModeEnabled) {
            $('body').addClass('dark-mode');
            $('#modeToggle').removeClass('fa-moon').addClass('fa-sun');
        } else {
            $('body').removeClass('dark-mode');
            $('#modeToggle').removeClass('fa-sun').addClass('fa-moon');
        }
    }

    function setupEventHandlers() {
        $("#submitGuess").click(handleGuessSubmission);
        $("#playAgain").click(resetGame);
    }

    function handleGuessSubmission() {
        const guess = parseInt($("#guess").val(), 10);

        if (isNaN(guess) || guess < 1 || guess > 10) {
            $("#resultMessage").text("Please enter a number between 1 and 10.");
        } else {
            attemptCount++;
            let attemptsLeft = maxAttempts - attemptCount;
            if (guess === secretNumber) {
                $("#resultMessage").text(`Congratulations! You guessed the number ${secretNumber} in ${attemptCount} attempts.`);
                $("#submitGuess").hide();
                $("#playAgain").show();
            } else if (attemptCount >= maxAttempts) {
                $("#resultMessage").text(`Game over! You've used all ${maxAttempts} attempts. The number was ${secretNumber}.`);
                $("#submitGuess").hide();
                $("#playAgain").show();
            } else if (guess < secretNumber) {
                $("#resultMessage").text(`Attempt ${attemptCount}: Too low! Try again. ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`);
            } else {
                $("#resultMessage").text(`Attempt ${attemptCount}: Too high! Try again. ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`);
            }
        }
    }

    function resetGame() {
        secretNumber = chance.integer({ min: 1, max: 10 });
        attemptCount = 0;
        $("#guess").val("");
        $("#resultMessage").text("");
        $("#submitGuess").show();
        $("#playAgain").hide();
    }

    $(document).ready(function() {
        initializeGame();
    });

    return {
        initializeGame,
        resetGame
    };
})($, chance);

export default GuessingGameModule;
