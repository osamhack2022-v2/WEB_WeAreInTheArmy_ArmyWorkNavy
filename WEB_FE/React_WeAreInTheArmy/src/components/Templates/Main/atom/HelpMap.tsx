import FlexContainer from '../../../UI/FlexContantainer';
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useReducer, useState } from 'react';
import { Post } from 'src/type';
import { useForceUpdate } from 'src/hooks/useForcedUpdate';

const HelpMap = ({ posts }: { posts: Post[] }) => {
  const [markers, setMarkers] = useState<
    {
      position: {
        lat: number;
        lng: number;
      };
      content: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    posts.forEach((v: Post) => {
      let marker: {
        position: {
          lat: number;
          lng: number;
        };
        content: string;
      };
      // 여기서 비동기 작업함.
      // 근데 렌더링 이후에 데이터를 받아오고, 렌더링이 되면 함수가 데이터를 다 받아왔는데, 그 이후론 렌더링 여부를 정할 수 없음.
      // 왜냐면 데이터를 받아왔는지, 안받았는지 체크가 안돼서,,
      ps.keywordSearch(v.location, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          marker = {
            position: {
              lat: parseFloat(data[0].y),
              lng: parseFloat(data[0].x),
            },
            content: data[0].place_name,
          };
          setMarkers((prev) => [...prev, marker]);
        }
      });
    });
  }, []);
  return (
    <div className="p-5 h-full mb-3 w-[800px]">
      {loading === false ? (
        <div>로딩 중..</div>
      ) : (
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 36.406931141203636,
            lng: 127.2786853136011,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '450px',
          }}
          level={14} // 지도의 확대 레벨
        >
          {markers.map((marker, index) => (
            <CustomOverlayMap
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}-${index}`}
              position={marker.position}
            >
              <FlexContainer className="label rounded-full bg-red-400 w-24 h-24 flex-col bg-red-500 justify-center items-center opacity-20 text-sm">
                <span className="z-10">{marker.content}</span>
              </FlexContainer>
            </CustomOverlayMap>
          ))}
        </Map>
      )}
    </div>
  );
};

export default HelpMap;
