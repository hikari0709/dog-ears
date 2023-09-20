import List from './list';

const ListView = () => {
  return (
    <main>
      <List
        headingText="listのheadingテキスト"
        listItems={['apple', 'orange']}
      />
    </main>
  );
};

export default ListView;
