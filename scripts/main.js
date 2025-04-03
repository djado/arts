(function() {
  let m = model = {
    sections: ["sec_0", "sec_1", "sec_2", "sec_3", "sec_4", "sec_5"],
    screens: null,
    touchStart: null,
    touchEnd: null,
    getScreenCoords: function() {
      let offsetTop = document.body.getBoundingClientRect().top;
      this.screens = Array.from(document.querySelectorAll("section")).map(el => {
        return el.getBoundingClientRect().top + offsetTop;
      });
    }
  };

  let v = view = {
    scrollIt: function(id) {
      document.querySelector(id).scrollIntoView({block: "start", behavior: "smooth"});
    },
    scrollNext: function(clickedId) {
      let pos = m.sections.findIndex(el => el === clickedId);
      let next = pos + 1;
      if(next === m.sections.length) {
        next = 0;
      }
      let elId = "#sec_" + next;
      this.scrollIt(elId);
      this.hideTitle(elId);
    },
    scrollPrev: function(clickedId) {
      let pos = m.sections.findIndex(el => el === clickedId);
      let prev = pos - 1;
      if(prev < 0) {
        prev = m.sections.length - 1;
      }
      let elId = "#sec_" + prev;
      this.scrollIt(elId);
      this.hideTitle(elId);
    },
    hideTitle: function(id) {
    }
  };

  let c = controller = {
    handleStart: function(e) {
      m.touchStart = e.touches[0].screenY;
    },
    handleEnd: function(e) {
      let clickedId = e.target.closest("section").id;
      m.touchEnd = e.changedTouches[0].screenY;
      if(m.touchEnd < m.touchStart) {
        v.scrollNext(clickedId);
      } else {
        v.scrollPrev(clickedId);
      }
    }
  };

  m.init = function() {
    m.getScreenCoords();

    window.addEventListener("resize", () => {
      m.getScreenCoords();
    });

    document.addEventListener("click", (e) => {
        let clickedId = e.target.closest("section").id;
        let height = window.screen.height;
        let midheight = height/2;
        if(e.y < midheight) {
          v.scrollPrev(clickedId);
        } else {
          v.scrollNext(clickedId);
        }
    });

    document.addEventListener("touchstart", c.handleStart, false);
    document.addEventListener("touchend", c.handleEnd, false);
  };

  m.init();
})();
