export interface RouterPublicProps {
  components: {
    [k: string]: {
      component: any;
      path: string;
    };
  };
}
