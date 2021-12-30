# React Netflix Clone

## useRouteMatch()

- 현재 URL이 ()괄호 안에 전달한 라우트와 일치하는지 체크
- React router dom 버전5 사용시
- https://v5.reactrouter.com/web/api/Hooks/useroutematch

```js
const homeMatch = useRouteMatch("/");
const tvMatch = useRouteMatch("/tv");
```

## useMatch()

- 현재 URL이 ()괄호 안에 전달한 라우트와 일치하는지 체크
- React router dom 버전6 사용시
- https://reactrouter.com/docs/en/v6/upgrading/reach#usematch
- https://reach.tech/router/api/useMatch

## useViewportScroll

- viewport가 스크롤될 때 업데이트되는 MotionValues를 반환합니다.
- 웹 사이트에서 스크롤이 될 때마다, 해당 스크롤 값을 MotionValues로 반환해준다.
- https://www.framer.com/docs/motionvalue/###useviewportscroll

## useAnimation

- useAnimation훅을 사용하여 시작 및 중지 메서드가 있는 AnimationControls을 만들 수 있습니다.
- useAnimation훅을 사용하면 직접 사용자가 여러 개의 애니메이션의 시작과 중지를 컨트롤 할 수 있다.
- https://www.framer.com/docs/animation/#component-animation-controls

```ts
const navVariants = {
  start: { backgroundColor: "rgba(0,0,0,0)" },
  end: { backgroundColor: "rgba(0,0,0,1)" },
};

const Header = () => {
  // useAnimation훅을 사용해서 AnimationControls컨트롤을 가져온 후, inputAnimation을 컴포넌트에 animate prop에 넣는다.
  // inputAnimation에 start를 사용해서 state값에 따라 animate를 다르게 줄 수 있다.
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();

  // useViewportScroll훅을 사용해서 현재 뷰포트의 scrollY값을 반환해주는 MotionValue를 가져옴
  const { scrollY } = useViewportScroll();

  const handleToggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }

    setSearchOpen((currentState) => !currentState);
  };

  useEffect(() => {
    // scrollY.onChange()를 통해 scrollY값이 바뀔 때마다 계속해서 함수를 실행한다.
    scrollY.onChange(() => {
      // scrollY.get()를 통해 scrollY값을 가져온다.
      if (scrollY.get() < 150) {
        // start()안에 직접 css를 줄 수도 있고, 따로 navVariants를 생성하고, 키 값 start 또는 end를 줄 수도 있다.
        // navAnimation.start({ backgroundColor: "rgba(0,0,0,0)" });
        navAnimation.start("start");
      } else {
        // navAnimation.start({ backgroundColor: "rgba(0,0,0,1)" });
        navAnimation.start("end");
      }
    });
  }, [scrollY, navAnimation]);

  return (
    <Nav variants={navVariants} initial="start" animate={navAnimation}>
      <Column>
        <Search>
          <SearchSVG
            onClick={handleToggleSearch}
            animate={{ x: searchOpen ? -20 : 0 }} // searchOpen state값에 따라 다른 animate를 줄 수 있다.
            transition={{ type: "linear" }}
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </SearchSVG>
          <Input animate={inputAnimation} transition={{ type: "linear" }} type="text" placeholder="Search for movie or tv show" />
        </Search>
      </Column>
    </Nav>
  );
};

export default Header;
```

## window width, height

- window.outerWidth : 브라우저 전체의 너비
- window.outerHeight : 브라우저 전체의 높이
- window.innerWidth : 브라우저 화면의 너비
- window.innerHeight : 브라우저 화면의 높이
- outerWidth vs innerWidth 비교 이미지
- https://www.cluemediator.com/how-to-get-the-window-size-in-javascript

## onExitComplete

- 모든 종료 중인 노드들이 애니메이션 아웃을 완료하면 실행됩니다.
- 다시 말해, 실행중인 애니메이션이 있다면 종료된 후에 실행되는 이벤트이다.
- https://www.framer.com/docs/animate-presence/###onexitcomplete

## slice()

- slice() 메서드는 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

## React router dom 5버전 -> 6버전 훅

- useHistory() -> useNavigate()
- useRouteMatch() -> useMatch()
