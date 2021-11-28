{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };
  type VideoMetadata = Pick<Video, 'id' | 'title'>;

  function getVideo(id: string): Video {
    // Video를 리턴한다.
    return {
      id,
      title: 'video',
      url: 'https://..',
      data: 'byte-data..'
    };
  }
  function getVideoMetadata(id: string): VideoMetadata {
    //* Video와 관련된 것만 리턴한다. VideoMetadata를 이용하면 유연하게 타입을 고정시키고 재사용 가능하다.
    //정보가 많은 타입이 있고 몇가지만 다루는 타입은 PICK을 이용한다. PICk타입은 기존 타입에서 쏙쏙 골라서 제한을 둘 때 사용한다.
    //해당 타입의 key를 문자열로 써야 하고 그렇지 않은 것을 문자열로 쓰면 에러가 뜬다.
    return {
      id: id,
      title: 'title'
    };
  }
}
