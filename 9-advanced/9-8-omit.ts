{
  //omit은 pick과 반대로 필요한 것을 뺄 수 있다.
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };
  type VideoMetadata = Omit<Video, 'id' | 'title'>;

  function getVideo2(id: string): Video {
    // Video를 리턴한다.
    return {
      id,
      title: 'video',
      url: 'https://..',
      data: 'byte-data..'
    };
  }
  function getVideoMetadata2(id: string): VideoMetadata {
    //* Omit에 전달되는 key는 해당 타입에 없는 key도 넣을 수 있다.
    // 'Video(특정타입)에 있는 key들이 있다면 이것을 제외한 것을 리턴할게' 라는 뜻이다.
    // 대신 제외한 모든 것을 다 써줘야한다

    return {
      url: 'https://..',
      data: 'byte-..'
    };
  }
}

//?? 빼고자 하는 것이 명확하다면 Omit
//?? 선택하고자 하는 것이 명확하다면 Pick !!
