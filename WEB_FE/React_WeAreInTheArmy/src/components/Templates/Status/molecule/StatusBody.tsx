import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody';
import { Post } from 'src/type';

import ColorAccept from '../atom/ColorAccept';
import StatusRow from '../atom/StatusRow';

export default function StatusBody({ posts }: { posts: Post[] }) {
  return (
    <TableBody className="shadow-md bg-white">
      {posts.map((post: Post) => (
        <StatusRow key={post.idx} {...post} />
      ))}
    </TableBody>
  );
}
