import { useAppSelector } from '@/lib/redux/hooks/redux';
import { IntrospectionObjectType } from 'graphql';
import './Documentation.css';

export default function Documentation() {
  const schema = useAppSelector((state) => state.schema.schema);
  const queries = schema?.types.find(
    (el) => el.name === 'Query'
  ) as IntrospectionObjectType;

  return (
    <>
      {schema && (
        <div className="documentation-container">
          <div>
            <h3 className="queries-title">{queries?.name}</h3>
            <ul className="queries-list">
              {queries?.fields.map((el, index) => (
                <li key={index} className="query-item">
                  {el.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
