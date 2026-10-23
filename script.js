function time_to_seconds(time) {
    const [minute, rest] = time.split(":");
    const [seconds, miliseconds] = rest.split(".");
    const mininsec = Number(minute) * 60;
    const sec = Number(seconds);
    const msinsec = Number(miliseconds) / 1000;
    return mininsec + sec + msinsec;
}

function seconds_to_time(time) {
    const minutes = Math.trunc(time / 60);
    const seconds = Math.trunc(time - minutes * 60);
    const miliseconds = (time - (minutes * 60 + seconds)) * 1000 ;
    return (minutes + ":" + seconds + "." + miliseconds).slice(0,8);
}

function calc_diff(player, wr) {
    const diff = (time_to_seconds(player)) - (time_to_seconds(wr));
    const result =  String(diff).slice(0,5);
    return Number(result);
}

function ochi(diff) {
    const ochi = Math.ceil(diff);
    if (ochi <= 0)
        return 0;
    else return ochi;
}

function ochi_color(ochi) {
    if (ochi === 1) {
        return "#cf0110";
    } else if (ochi === 2) {
        return "#f4e41d";
    } else if (ochi === 3) {
        return "#78cf2f";
    } else if (ochi === 4) {
        return "#448fe2";
    } else if (ochi === 5) {
        return "#bd0ae2";
    } else return "#4d5057";
}


let menu = false;
const menuClick = document.getElementById("menu-btn");
const sidebar = document.getElementById("menu_sidebar");
const overlay = document.getElementById("overlay");


const submitClick = document.getElementById("menu_submit");
const listClick = document.getElementById("menu_list");
const statsClick = document.getElementById("menu_stats");
const deleteClick = document.getElementById("menu_delete");
const profileClick = document.getElementById("menu_profile");

function toggleMenu() {
    menu = !menu;
    if (menu === true) {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        menuClick.classList.add("active");
    } else {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        menuClick.classList.remove("active");
    }
}

submitClick.addEventListener("click", toggleMenu);
listClick.addEventListener("click", toggleMenu);
statsClick.addEventListener("click", toggleMenu);
deleteClick.addEventListener("click", toggleMenu);
profileClick.addEventListener("click", toggleMenu);
menuClick.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

let mode = "home";


submitClick.addEventListener("click", () => {
    mode = "submit";
})
listClick.addEventListener("click", () => {
    mode = "list";
})
statsClick.addEventListener("click", () => {
    mode = "stats";
})
deleteClick.addEventListener("click", () => {
    mode = "delete";
})
profileClick.addEventListener("click", () => {
    mode = "profile";
})


const SUPABASE_URL = "https://ktsthvumqxopnasqksbp.supabase.co/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c3RodnVtcXhvcG5hc3Frc2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NzA5NzAsImV4cCI6MjA5MzU0Njk3MH0.o8zPxssojP8Fng1IdNElcv13MYkZWG_3JKdlOH8KF3s";

if (typeof supabase === "undefined" || !supabase) {
    var supabase = (window.supabase && typeof window.supabase.createClient === "function") 
        ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
        : null;
}

function applyOchiColors() {
    if (typeof ochi_color !== "function") return;
    for (let i = 1; i <= 6; i++) {
        const badge = document.querySelector(`.ochi_item[data-ochi="${i}"] .ochi_badge`);
        if (badge) {
            badge.style.backgroundColor = ochi_color(i);
        }
    }
}

async function updateAuthUI() {
    if (!supabase || !supabase.auth) return;

    try {
        const { data: { session } } = await supabase.auth.getSession();
        const logoutSection = document.getElementById("log_out");
        const dashboardSection = document.getElementById("user_dashboard");

        if (session) {
            if (logoutSection) logoutSection.style.display = "none";
            if (dashboardSection) dashboardSection.style.display = "block";

            const user = session.user;
            const username = user.user_metadata.full_name || user.user_metadata.name || "ユーザー";
            const avatarUrl = user.user_metadata.avatar_url || "https://raw.githubusercontent.com/Kamanb85/NITAbot-Website/main/img/nita.png";

            const nameEl = document.getElementById("user_name");
            const avatarEl = document.getElementById("user_avatar");

            if (nameEl) nameEl.textContent = `@${username}`;
            if (avatarEl) avatarEl.src = avatarUrl;

            applyOchiColors();
        } else {
            if (logoutSection) logoutSection.style.display = "block";
            if (dashboardSection) dashboardSection.style.display = "none";
        }
    } catch (err) {
        console.error("UI更新エラー:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (supabase && supabase.auth) {
        supabase.auth.onAuthStateChange(() => {
            updateAuthUI();
        });
        updateAuthUI();
    } else {
        console.warn("Supabase SDKが読み込まれていません。index.htmlの<script>タグの順番を確認してください。");
    }

    const loginBtn = document.getElementById("login_btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            if (!supabase || !supabase.auth) {
                alert("Supabase SDK の読み込みに失敗しています。HTMLの設定を確認してください。");
                return;
            }
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "discord",
                options: {
                    redirectTo: window.location.href
                }
            });
            if (error) console.error("ログインエラー:", error.message);
        });
    }

    const logoutBtn = document.getElementById("logout_btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            if (supabase && supabase.auth) {
                await supabase.auth.signOut();
            }
        });
    }

    const dashSubmitBtn = document.getElementById("dash_submit_btn");
    const dashListBtn = document.getElementById("dash_list_btn");

    if (dashSubmitBtn) {
        dashSubmitBtn.addEventListener("click", () => {
            mode = "submit";
            console.log("現在のモード:", mode);
        });
    }

    if (dashListBtn) {
        dashListBtn.addEventListener("click", () => {
            mode = "list";
            console.log("現在のモード:", mode);
        });
    }
});
