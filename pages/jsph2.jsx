import { LoadUsersByClick } from '../components/jsph-by-click';
import { LoadUserOnMount } from '../components/jsph-on-mount';

export default function users1() {
  return <>
    <h1>Users on mount</h1>
  <LoadUserOnMount/>
  </>;
}