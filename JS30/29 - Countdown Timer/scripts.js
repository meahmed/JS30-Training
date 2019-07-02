let countdown;
const buttons = document.querySelectorAll('[data-time]');
function timer(seconds){
	clearInterval(countdown	);
	const now = Date.now();
	const then = now + seconds*1000;
	displayTimeLeft(seconds);
	endTimer(then);
	countdown = setInterval(()=>{
		const secondsLeft = Math.round((then - Date.now())/1000);
		if(secondsLeft<0){
				clearInterval(countdown);
				return
			}
		displayTimeLeft(secondsLeft);
	},1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds/60);
	const remainderSconds = seconds%60;
	const display = `${minutes}:${remainderSconds<10?'0':''}${remainderSconds}`;
	const timeLeft = document.querySelector('.display__time-left');
	timeLeft.textContent = display;
}

function endTimer(timeStamp){
	const end = new Date(timeStamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	const display = `Be Back at ${hour}:${minutes<10?'0':''}${minutes}`;
	const endTime = document.querySelector('.display__end-time');
	endTime.textContent = display;
}

function startTimer(){
	const buttonTimer = this.dataset.time;
	timer(buttonTimer);
}

buttons.forEach(button => button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit', function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins*60);
});