import { exec } from "child_process";
import dayjs from "dayjs";
import chalk from "chalk";
import figlet from "figlet";
function getGitCommits() {
  exec('git log --pretty=format:"%ad" --date=short', (error, stdout) => {
    if (error) {
      console.error(
        chalk.red("❌ Error: Make sure you're in a Git repository.")
      );
      return;
    }
    const commitDates = stdout.split("\n").map((date) => dayjs(date.trim()));
    calculateStreak(commitDates);
  });
}
function calculateStreak(dates) {
  let streak = 0;
  let today = dayjs().startOf("day");

  for (let date of dates) {
    if (date.isSame(today)) {
      streak++;
    } else if (date.isSame(today.subtract(1, "day"))) {
      streak++;
      today = today.subtract(1, "day");
    } else {
      break;
    }
  }

  console.log(chalk.green(figlet.textSync("Git Streak!")));
  console.log(`🔥 Current Streak: ${chalk.yellow(streak)} days`);
}

getGitCommits();
