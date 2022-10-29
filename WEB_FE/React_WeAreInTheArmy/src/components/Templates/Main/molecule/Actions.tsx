import FlexContainer from '../../../UI/FlexContantainer';
import ActionWrapper from '../atom/ActionWrapper';

export default function Actions() {
  return (
    <FlexContainer className="w-full bg-white justify-center p-10">
      <FlexContainer className="w-[800px] justify-between">
        <ActionWrapper
          src="/public/assets/imgs/MainPage/icon_fire.png"
          messages={
            <div>
              신속하고 정확하게 <br /> 효율적으로 재난 피해 회복
            </div>
          }
        />
        <ActionWrapper
          src="/public/assets/imgs/MainPage/icon_people.png"
          messages={
            <div>
              쉽고 간편하게 <br />
              도움이 필요한 위치 파악
            </div>
          }
        />
        <ActionWrapper
          src="/public/assets/imgs/MainPage/icon_soldier.png"
          messages={
            <div>
              군에 대한
              <br />
              국민의 신뢰도 상승
            </div>
          }
        />
        <ActionWrapper
          src="/public/assets/imgs/MainPage/icon_travel.png"
          messages={
            <div>
              용사에게는 큰 동기가 <br />
              피해지역에는 도움을 줌
            </div>
          }
        />
      </FlexContainer>
    </FlexContainer>
  );
}
