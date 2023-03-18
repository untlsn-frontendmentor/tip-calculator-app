import BillForm from '~/components/BillForm';

export default function Home() {
  return (
    <main class="font-mono min-h-screen bg-c-cyan-200 flex-(~ col) justify-center">
      <p class="text-center">
        <i class="i-my-logo text-20" aria-label="splitter">&nbsp;</i>
      </p>
      <BillForm />
    </main>
  );
}
