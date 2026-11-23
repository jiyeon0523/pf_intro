const profileData = [
  {
    title: "Education",
    items: [
      ["2026", "안양 그린컴퓨터아트학원 (AI 워크플로우 기반 UX 분석 및 제작 실무자 양성)"],
      ["2026", "경기대학교 졸업 (시각정보디자인학과)"],
      ["2020", "동안고등학교 졸업"],
    ],
  },
  {
    title: "Licence",
    items: [
      ["2021", "GTQ그래픽기술자격 2급"],
      ["2021", "2종 보통운전면허"],
    ],
  },
  {
    title: "Experience",
    items: [
      ["2025", "PACK STAR 대한민국 패키지 디자인 대전 특선"],
      ["2024", "Toronto ILSC Education Group Certificate Of Completion(6개월)"],
      ["2022", "수원 청년터전 6회차 전시 참가"],
    ],
  },
];

const works = [
  {
    id: "skinfood",
    category: "UIUX",
    image: "/assets/7dea1.png",
    title: "스킨푸드 웹사이트 리뉴얼",
    type: "Web Design · UI/UX",
    link: "https://jiyeon0523.github.io/skinfood/",
    ppt: "https://jiyeon0523.github.io/skinfood/skinfood_ppt.pdf",
  },
  {
    id: "havn",
    category: "BRANDING",
    image: "/assets/6c722.png",
    title: "HAVN",
    type: "Trans Branding · Team Project",
    ppt: "#",
  },
  {
    id: "ifne",
    category: "BRANDING",
    image: "/assets/de313.png",
    title: "이프네 리브랜딩",
    type: "Rebranding · Team Project",
    video: "#",
    ppt: "#",
  },
  {
    id: "environment",
    category: "BRANDING",
    image: "/assets/5344c.png",
    title: "비교과 환경 교육 프로그램",
    type: "Branding · Team Project",
    video: "#",
    ppt: "#",
  },
];

const profileTimeline = document.querySelector("#profile-timeline");
const svgNS = "http://www.w3.org/2000/svg";

function createProfileTimeline() {
  const svg = document.createElementNS(svgNS, "svg");
  svg.classList.add("timeline-svg");
  svg.setAttribute("aria-hidden", "true");
  profileTimeline.append(svg);

  profileData.forEach(({ title, items }) => {
    const group = document.createElement("section");
    group.className = "timeline-group";
    group.innerHTML = `<span class="timeline-anchor" aria-hidden="true"></span><h3>${title}</h3>`;
    const list = document.createElement("ul");
    items.forEach(([year, text]) => {
      const item = document.createElement("li");
      item.innerHTML = `<time>${year}</time><span>${text}</span>`;
      list.append(item);
    });
    group.append(list);
    profileTimeline.append(group);
  });
  drawProfileConnections();
}

function drawProfileConnections() {
  const svg = profileTimeline.querySelector(".timeline-svg");
  const anchors = [...profileTimeline.querySelectorAll(".timeline-anchor")];
  if (!svg || window.innerWidth <= 760) return;
  svg.replaceChildren();
  const svgRect = svg.getBoundingClientRect();
  const points = anchors.map((anchor) => {
    const rect = anchor.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - svgRect.left,
      y: rect.top + rect.height / 2 - svgRect.top,
    };
  });

  const rows = [];
  points.forEach((point) => {
    let row = rows.find((item) => Math.abs(item.y - point.y) < 24);
    if (!row) {
      row = { y: point.y, points: [] };
      rows.push(row);
    }
    row.points.push(point);
  });

  rows.forEach(({ points: rowPoints }) => {
    rowPoints.sort((a, b) => a.x - b.x);
    rowPoints.slice(0, -1).forEach((point, index) => {
      const next = rowPoints[index + 1];
      const controlY = Math.max(0, Math.min(point.y, next.y) - 42);
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute(
        "d",
        `M ${point.x} ${point.y} C ${point.x} ${controlY}, ${next.x} ${controlY}, ${next.x} ${next.y}`,
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#f4a9c1");
      path.setAttribute("stroke-width", "1");
      path.setAttribute("stroke-dasharray", "3 5");
      path.setAttribute("opacity", ".72");
      svg.append(path);
    });
    if (rowPoints.length < 3) return;

    const lastPoint = rowPoints[rowPoints.length - 1];
    const endX = lastPoint.x + 90;
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      `M ${lastPoint.x} ${lastPoint.y} C ${lastPoint.x} ${Math.max(0, lastPoint.y - 42)}, ${endX} ${Math.max(0, lastPoint.y - 42)}, ${endX} 30`,
    );
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#f4a9c1");
    path.setAttribute("stroke-width", "1");
    path.setAttribute("stroke-dasharray", "3 5");
    path.setAttribute("opacity", ".72");
    svg.append(path);
  });
}

function createWorkCards() {
  const filters = document.querySelector(".filters");
  const grid = document.querySelector("#work-grid");
  ["ALL", "UIUX", "BRANDING", "CONTENTS", "OTHER"].forEach((name, index) => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.type = "button";
    button.dataset.filter = name;
    button.setAttribute("aria-pressed", String(index === 0));
    button.textContent = name;
    filters.append(button);
  });

  works.forEach((work) => {
    const article = document.createElement("article");
    article.className = "work-card";
    article.dataset.category = work.category;
    article.dataset.id = work.id;
    const linkIcon = work.link
      ? `<a href="${work.link}" target="_blank" rel="noopener" aria-label="${work.title} 웹사이트 열기"><img src="/assets/5bdf6.svg" alt=""></a>`
      : "";
    const videoIcon = work.video
      ? `<span role="img" aria-label="프로젝트 영상"><img src="/assets/39b1e.svg" alt=""></span>`
      : "";
    const pptIcon = work.ppt
      ? work.ppt === "#"
        ? `<span role="img" aria-label="프로젝트 PPT"><img src="/assets/97acc.svg" alt=""></span>`
        : `<a href="${work.ppt}" target="_blank" rel="noopener" aria-label="${work.title} PPT 열기"><img src="/assets/97acc.svg" alt=""></a>`
      : "";
    article.innerHTML = `
      <img src="${work.image}" alt="${work.title} 프로젝트 대표 이미지">
      <div class="work-card-overlay">
        <div><h3>${work.title}</h3><p>${work.type}</p></div>
        <div class="card-actions">${linkIcon}${videoIcon}${pptIcon}</div>
      </div>`;
    grid.append(article);
  });

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-button");
    if (!button) return;
    const filter = button.dataset.filter;
    filters
      .querySelectorAll("button")
      .forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    let count = 0;
    grid.querySelectorAll(".work-card").forEach((card) => {
      const visible = filter === "ALL" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) count += 1;
    });
    document.querySelector("#filter-status").textContent =
      `${filter} 작업 ${count}개가 표시되었습니다.`;
  });
}

function setupSkillsAnimation() {
  const section = document.querySelector(".skills");
  section.querySelectorAll(".tool").forEach((tool) => {
    tool.style.setProperty("--ring", `${tool.dataset.level}%`);
  });
  const threshold = 0.3;
  const observer = new IntersectionObserver(
    ([entry]) => {
      section.classList.toggle("in-view", entry.intersectionRatio >= threshold);
    },
    { threshold },
  );
  observer.observe(section);
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      mobileMenu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  const links = [...document.querySelectorAll(".nav-list a")];
  const sections = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-35% 0px -60% 0px" },
  );
  sections.forEach((section) => observer.observe(section));
}

createProfileTimeline();
createWorkCards();
setupSkillsAnimation();
setupNavigation();
window.addEventListener("resize", drawProfileConnections);
